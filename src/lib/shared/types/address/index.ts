import { CANADA } from './canada';
import { UNITED_STATES } from './united-states';
import * as Country from './country';

const COUNTRY_MAP = {
    [CANADA.COUNTRY.CODE]: CANADA,
    [UNITED_STATES.COUNTRY.CODE]: UNITED_STATES,
};

export { CANADA, UNITED_STATES, COUNTRY_MAP, Country };
