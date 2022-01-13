import mem from 'memoryjs';

export default class Memory {
  getProcess() {
    return mem.openProcess('csgo.exe');
  }

  async getModule(moduleName) {
    return await mem.findModule(moduleName, this.getProcess().th32ProcessID);
  }

  async read(address, type) {
    let result = null;
  
    try {
      result = await mem.readMemory(this.getProcess().handle, address, type);
    } catch (error) {
      log.error(`Failed reading from ${address}`);
    }

    return result;
  }

  async write(address, type, buffer) {
    try {
      await mem.writeMemory(this.getProcess().handle, address, buffer, type);
    } catch (error) {
      log.error(`Failed writing to ${address}`);
    }
  }
}
