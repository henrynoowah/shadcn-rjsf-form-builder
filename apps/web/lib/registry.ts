import registryData from '../registry.json';

export type RegistryItem = (typeof registryData.items)[number];

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registryData.items.find((item) => item.name === name);
}

export function getAllRegistryItems(): RegistryItem[] {
  return registryData.items;
}
