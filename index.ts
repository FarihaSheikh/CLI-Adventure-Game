#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let enemies: string[] = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
let maxEnemyHealth: number = 75;
let enemyAttackDamage: number = 25;

let health: number = 100;
let attackDamage: number = 50;
let numHealthPotions: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50; // Percent

let running: boolean = true;

let getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * max - min) + min;
}

console.log(chalk.yellow("\n\tWelcome to the Adventure Game Dungeon!"));

GAME:
while (running) {
    console.log(chalk.blue("\t-----------------------------------------"));
    let enemyHealth: number = getRandomNumber(1, maxEnemyHealth);
    let enemy: string = enemies[getRandomNumber(0, enemies.length - 1)];

    console.log(chalk.red(`\t# ${enemy} has appeared #\n`));

    while (enemyHealth > 0) {
        console.log(chalk.green(`\n\t# Your HP: ${health} #`));
        console.log(chalk.green(`\t# ${enemy} HP: ${enemyHealth} #`));

        let control = await inquirer.prompt([{
            message: chalk.cyan("\nWhat would you like to do?"),
            type: "list",
            choices: [chalk.yellow("\tAttack"), chalk.yellow("\tDrink Health Potion"), chalk.yellow("\tRun")],
            name: "command"
        }]);

        switch (control.command) {
            case chalk.yellow("\tAttack"):
                let strikeDamage: number = getRandomNumber(1, attackDamage);
                let damageTaken: number = getRandomNumber(1, enemyAttackDamage);

                health -= damageTaken;
                enemyHealth -= strikeDamage;
                console.log(chalk.red(`\tYou strike the ${enemy} with ${strikeDamage} damage.`));
                console.log(chalk.red(`\tYou received ${damageTaken} damage from the ${enemy}`));

                if (health < 1) {
                    console.log(chalk.red(`\tYou have taken too much damage. You are too weak to go on.`));
                    break;
                }
                break;

            case chalk.yellow("\tDrink Health Potion"):
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    console.log(chalk.green(`\tYou drink a health potion, healing yourself for ${healthPotionHealAmount}.`));
                    console.log(chalk.green(`\tYou now have ${health} HP.`));
                    console.log(chalk.green(`\tYou now have ${numHealthPotions} health potion(s) left`));
                } else {
                    console.log(chalk.red(`\n\tYou have no health potions left. Defeat enemies for a chance to get one.`));
                }

                break;

            case chalk.yellow("\tRun"):
                console.log(chalk.blue(`\tYou ran away from the ${enemy}.`));
                continue GAME;
                break;

        }
    }

    if (health < 1) {
        console.log(chalk.red(`\t You limp out of the dungeon, weak from battle.`));
        break;
    }

    console.log(chalk.blue("\t-----------------------------------------"));
    console.log(chalk.yellow(`\t# ${enemy} has been defeated #`));
    console.log(chalk.yellow(`\t# You have ${health} HP left #`));

    if (getRandomNumber(1, 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(chalk.green(`\t# The ${enemy} dropped a health potion #`));
        console.log(chalk.green(`\t# You now have ${numHealthPotions} health potion(s). #`));
    }

    let stateControl = await inquirer.prompt({
        message: chalk.cyan("\n\tWhat would you like to do?"),
        type: "list",
        choices: [chalk.yellow("\tContinue Fighting"), chalk.yellow("\tExit Dungeon")],
        name: "command"
    });

    if (stateControl.command === chalk.yellow("\tContinue Fighting")) {
        console.log(chalk.green(`\n\tYour adventure continues!`));
    } else {
        console.log(chalk.green(`\n\tYou exit the dungeon, successful from your adventures.`));
        break;
    }
}

console.log(chalk.yellow(`\n\t#####################`));
console.log(chalk.yellow(`\tTHANK YOU FOR PLAYING`));
console.log(chalk.yellow(`\t#####################`));
