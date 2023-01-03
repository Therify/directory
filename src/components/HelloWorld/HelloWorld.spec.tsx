import { render } from '@testing-library/react';
import type { Language } from './HelloWorld';
import { HelloWorld, LANGUAGES } from './HelloWorld';

describe('Hello World Component', function () {
    test.each(Object.keys(LANGUAGES))('should render %s', function (language) {
        const { getByText } = render(
            <HelloWorld language={language as Language} />
        );
        expect(
            getByText(`${LANGUAGES[language as Language]}, World!`)
        ).toBeInTheDocument();
    });
});
