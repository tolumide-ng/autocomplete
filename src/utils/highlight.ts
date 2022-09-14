export const highlight = (query: string, name: string, classes: string): string => {
    let times = 0;
    let found = false;
    const arr: Array<string> = [];

    for (let i = 0; i < name.length; i++) {
        if (!found) {
            // perform lookup
            const containsQuery = name.toLowerCase().slice(i).indexOf(query.toLowerCase());
            if (containsQuery === 0) {
                // we don't need to update the `found` and `times` variable if the query has only one letter
                if (query.length > 1) {
                    found = true;
                    times = query.length - 1;
                }
                arr.push(`<span class=${classes}>${name[i]}</span>`)
            } else {
                arr.push(`<span>${name[i]}</span>`)
            }
        } else {
            arr.push(`<span class=${classes}>${name[i]}</span>`);
            times -= 1;

            if (times === 0) {
                found = false;
            }
        }
    }
    return arr.join("");
}