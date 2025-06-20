import { signify } from 'react-signify';
import type { MatchSetup } from './models/DataObject';
import { setDefaultMatchSetUp } from "./services/Function";

export const matchSetUpStore = signify<MatchSetup>(setDefaultMatchSetUp());

export const isOpacityStore = signify<boolean>(false);