export interface IMenuProperties {
  onChange: (name: string) => void;
  activeTab: NameMenuItem;
  isFocused: boolean;
}

export enum NameMenuItem {
  ADD = 'add',
  SHOW = 'show',
  REMOVE = 'remove',
  UPDATE = 'update',
  HELP = 'help',
  EXIT = 'exit',
}