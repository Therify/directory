import { useState, useMemo } from 'react';

export function useMemberRegistration() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [givenName, setGivenName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [hasAcceptedTermsAndConditions, setHasAcceptedTermsAndConditions] =
        useState(false);
    const handleEmailAddressChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmailAddress(event.target.value);
        },
        []
    );
    const handlePasswordChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
        },
        []
    );
    const handleConfirmPasswordChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
        },
        []
    );
    const handleGivenNameChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setGivenName(event.target.value);
        },
        []
    );
    const handleSurnameChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setSurname(event.target.value);
        },
        []
    );
    const handleDateOfBirthChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setDateOfBirth(event.target.value);
        },
        []
    );
    const handleHasAcceptedTermsAndConditionsChange = useMemo(
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setHasAcceptedTermsAndConditions(event.target.checked);
        },
        []
    );
    return {
        emailAddress,
        password,
        confirmPassword,
        givenName,
        surname,
        dateOfBirth,
        hasAcceptedTermsAndConditions,
        handleEmailAddressChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleGivenNameChange,
        handleSurnameChange,
        handleDateOfBirthChange,
        handleHasAcceptedTermsAndConditionsChange,
    };
}
