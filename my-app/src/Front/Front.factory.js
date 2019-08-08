import RangeInput from '../RangeInput';
import Trailer from '../Trailer';

const VIEW_MODE = {
  INPUT_BOX: 'inputBox',
  TRAILER: 'trailer',
}

const VIEW_MODE_COMPONENT = {
  [VIEW_MODE.INPUT_BOX]: RangeInput,
  [VIEW_MODE.TRAILER]: Trailer,
};

const Tiles = [
  {
    label: 'Input Box',
    value: [VIEW_MODE.INPUT_BOX],
  },
  {
    label: 'Trailer',
    value: [VIEW_MODE.TRAILER],
  }
]

export {
  VIEW_MODE,
  VIEW_MODE_COMPONENT,
  Tiles
};