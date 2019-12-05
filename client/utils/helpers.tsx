import { useState, SyntheticEvent, SetStateAction, Dispatch } from 'react';
import Button from '../components/common/Button';

/* eslint-disable import/prefer-default-export */
export function printCode(code: any) {
  return JSON.stringify(code);
}
