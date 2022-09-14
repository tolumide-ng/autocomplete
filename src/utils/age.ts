const UNIX_EPOCH = 1970;

export const age = (dob: string): number => {
    const dobMs = new Date(dob);

    if (dobMs instanceof Date) {
        const ageDate = new Date(Date.now() - dobMs.getTime());
        return Math.abs(ageDate.getUTCFullYear() - UNIX_EPOCH);
    }

    return 0;
}