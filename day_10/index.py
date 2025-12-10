import numpy as np

with open('./day_10/input.test.txt', 'r') as file:
    # Each element in the list will include the trailing newline character '\n'
    lines = list(file)

instructions = [line.strip().replace("\n", "").split(" ") for line in lines]

for instruction in instructions:
    requiredJoltage = [int(x) for x in instruction[-1].replace("{", "").replace("}", "").split(",")]

    buttonStrings = instruction[1:len(instruction) - 1]
    buttonsAsIndices = [[int(x) for x in buttonString.replace("(", "").replace(")", "").split(",")] for buttonString in buttonStrings]

    buttons = []
    for buttonAsIndex in buttonsAsIndices:
        button = [0] * len(requiredJoltage)
        for i in buttonAsIndex:
            button[i] = 1
        buttons.append(button)

    print("buttons", buttons)
    print("requiredJoltage", requiredJoltage)

    # This is an undetermined system (more variables than equations), so we need to use ILP (integer linear programming) 
    # to find the optimal solution
    # We want to minimize the number of button presses (sum of variables)
    # Subject to the constraint that the linear combination of button effects equals requiredJoltage
    A = np.array(buttons)
    b = np.array(requiredJoltage)

    # God knows how we solve that! 