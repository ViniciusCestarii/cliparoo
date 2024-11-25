const STATE_KEY = 'cliparooDocState';

type DocStateType = {
  dark?: boolean;
};

const initialState: DocStateType = {}

class DocState {
  #state: DocStateType;

  constructor() {
    this.#state = loadStateFromStorage();
  }

  get dark() {
    return !!this.#state.dark;
  }

  set dark(value: boolean) {
    this.#state.dark = value;
    setThemeHtml(value);
    this._saveState();
  }

  private _saveState = () => saveStateToStorage(this.#state);
}

export const loadStateFromStorage = () => {
  const storedState = localStorage.getItem(STATE_KEY);
  const state: DocStateType = storedState ? JSON.parse(storedState) : initialState;
  
  setThemeHtml(!!state.dark);

  return state;
};

export const saveStateToStorage = (state: DocStateType) => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const setThemeHtml = (dark: boolean) => {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

export const docState = $state(new DocState());

