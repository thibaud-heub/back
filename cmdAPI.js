const inquirer = require("inquirer");

async function main () {
    let done = false;

    while (!done) {
        await inquirer
            .prompt([
                {
                    type: "list",
                    name: "menu",
                    message: "What do you want to do?",
                    choices: [
                        "Get users",
                        "Add a user",
                        "Edit a user",
                        "Delete a user",
                        new inquirer.Separator(),
                        "Exit"
                    ]
                }
            ])
            .then(async (answer) => {
                switch (answer.menu) {
                case "Get users":
                    await fetch("http://localhost:3001")
                        .then(res => res.json())
                        .then(data => console.log(data));
                    break;
                case "Add a user":
                    await inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "first",
                                message: "Please enter a first name.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z-]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid first name.");
                                }
                            },
                            {
                                type: "input",
                                name: "last",
                                message: "Please enter a last name.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z-]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid last name.");
                                }
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "Please enter a email.",
                                validate (input) {
                                    if (/^[a-z0-9-_.]+@([a-z0-9]+\.)+[a-z]{2,4}$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid email.");
                                }
                            },
                            {
                                type: "input",
                                name: "company",
                                message: "Please enter a company.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z0-9-' ]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid company.");
                                }
                            },
                            {
                                type: "input",
                                name: "country",
                                message: "Please enter a country.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z-' ]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid country.");
                                }
                            },
                            {
                                type: "list",
                                name: "check",
                                message: "What do you want to do?",
                                choices: [
                                    "Valid",
                                    "Cancel"
                                ]
                            }
                        ]).then(async (answers) => {
                            if (answers.check === "Cancel") return;
                            delete answers.check;
                            await fetch("http://localhost:3001", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(answers) });
                        });
                    break;
                case "Edit a user":
                    await inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "id",
                                message: "Please enter an id.",
                                validate (input) {
                                    if (/^[0-9]+$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid id.");
                                },
                                filter (val) {
                                    return parseInt(val);
                                }
                            },
                            {
                                type: "input",
                                name: "first",
                                message: "Please enter a first name.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z-]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid first name.");
                                }
                            },
                            {
                                type: "input",
                                name: "last",
                                message: "Please enter a last name.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z-]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid last name.");
                                }
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "Please enter a email.",
                                validate (input) {
                                    if (/^[a-z0-9-_.]+@([a-z0-9]+\.)+[a-z]{2,4}$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid email.");
                                }
                            },
                            {
                                type: "input",
                                name: "company",
                                message: "Please enter a company.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z0-9-' ]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid company.");
                                }
                            },
                            {
                                type: "input",
                                name: "country",
                                message: "Please enter a country.",
                                validate (input) {
                                    if (/^[A-Z][A-Za-z-' ]*$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid country.");
                                }
                            },
                            {
                                type: "list",
                                name: "check",
                                message: "What do you want to do?",
                                choices: [
                                    "Valid",
                                    "Cancel"
                                ]
                            }
                        ]).then(async (answers) => {
                            if (answers.check === "Cancel") return;
                            delete answers.check;
                            await fetch("http://localhost:3001", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(answers) });
                        });
                    break;
                case "Delete a user":
                    await inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "id",
                                message: "Please enter an id.",
                                validate (input) {
                                    if (/^[0-9]+$/.test(input)) {
                                        return true;
                                    }

                                    throw Error("Please provide a valid id.");
                                },
                                filter (val) {
                                    return parseInt(val);
                                }
                            },
                            {
                                type: "list",
                                name: "check",
                                message: "What do you want to do?",
                                choices: [
                                    "Valid",
                                    "Cancel"
                                ]
                            }
                        ]).then(async (answers) => {
                            if (answers.check === "Cancel") return;
                            delete answers.check;
                            await fetch("http://localhost:3001", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(answers) });
                        });
                    break;
                case "Exit":
                    done = true;
                }
            });
    }
}

main();
