import numpy as np
from scipy.optimize import linprog

with open('./day_10/input.txt', 'r') as file:
    lines = list(file)

instructions = [line.strip().replace("\n", "").split(" ") for line in lines]

results = []
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

    print("len(buttons)", len(buttons))
    print("len(requiredJoltage)", len(requiredJoltage))

    # This is an undetermined system (more variables than equations), so we need to use ILP (integer linear programming) 
    # to find the optimal solution
    # We want to minimize the number of button presses (sum of variables)
    # Subject to the constraint that the linear combination of button effects equals requiredJoltage
    c = [1] * len(buttons)
    A = np.transpose(buttons)
    b = requiredJoltage

    print("A", A)
    print("b", b)
    print("c", c)

    result = linprog(c=c, A_eq=A, b_eq=b, method='highs', integrality=True)

    results += [result.fun]

total_button_presses = int(sum(results))
print("total_button_presses", total_button_presses)