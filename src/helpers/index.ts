import { type Application } from 'express';
import { dateFormat } from './date.helper';
import { moneyFormat } from './money.helper';

type ViewHelpers = {
  dateFormat: typeof dateFormat;
  moneyFormat: typeof moneyFormat;
};

export const registerHelpers = (app: Application): void => {
  const helpers: ViewHelpers = {
    dateFormat,
    moneyFormat,
  };

  Object.assign(app.locals, helpers);
};