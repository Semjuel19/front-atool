export const VARIANTS_TEXT = 'This configuration file contains options how to generate variants. Tag "tasks" shows ' +
    'combination of tasks which should be generated. Tags "score" and "count" indicate how many of which type ' +
    'of tasks wil be generated in this combination.';

export const CREATE_TASKS_TEXT  = 'You can create new function by inserting sufficient signature like example ' +
    '"int plus(int a, int b)". There are 3 supported types [int,char,void].';

export const ADD_TAG_TEXT  = 'You can add tags for multiple tasks. Follow this signature: ' +
    '"fun\\is_prime=numbers,fun\\count_leap_years=all"';

export const SCORE_REGEX = /(?:^|\W)(5|10|15|20|25)(?:$|\W)/g;

export const SINGLE_TAG_REGEX = /^[a-z0-9_]+$/i;

export const MULTIPLE_TAG_REGEX = /^((fun\/|acm\/)[a-z0-9_]+=[a-z0-9_]+(,|))+$/i;

export const ADD_FUNCTION_REGEX = /^(int|void|char) [a-z0-9_]+\((((int||char) [a-z0-9_]+(,|))+|)\)$/i;