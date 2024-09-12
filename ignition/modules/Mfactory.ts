import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MultisigFactoryModule = buildModule("MultisigFactoryModule", (m) => {

  const factory = m.contract("MultisigFactory");

  return { factory };
});

export default MultisigFactoryModule;