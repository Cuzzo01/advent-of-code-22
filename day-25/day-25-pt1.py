import math

input = open("./input.txt", "r")
lines = input.readlines()

# region StackOverflow functions


def reverse_slicing(s):
    return s[::-1]


def numberToBase(n, b):
    if n == 0:
        return [0]
    digits = []
    while n:
        digits.append(int(n % b))
        n //= b
    return digits[::-1]
# endregion


def SNAFUNumToDecimal(snafu: str):
    toReturn = 0
    count = 0
    for digit in reverse_slicing(snafu):
        value = SNAFUDigitToDecimal(digit)
        digitWeight = 5 ** count

        amount = value * digitWeight
        toReturn += amount

        count += 1

    return toReturn


def SNAFUDigitToDecimal(snafu: chr):
    if (snafu == '-'):
        return -1
    if (snafu == '='):
        return -2
    return int(snafu)


def Base5DigitToSNAFU(base5: int):
    if (base5 == 3):
        return "="
    if (base5 == 4):
        return "-"
    if (base5 == 5):
        return "0"
    return str(base5)


def Base5ToSNAFU(base5: list[int]):
    toReturn = ""
    carry = 0
    for num in list(reversed(base5)):
        toReturn = Base5DigitToSNAFU(num + carry) + toReturn
        if (num + carry > 2):
            carry = 1
        else:
            carry = 0

    if (carry == 1):
        toReturn = '1' + toReturn

    return toReturn


decimalSum = 0
for line in lines:
    snafu = line.strip()
    decimal = SNAFUNumToDecimal(snafu)
    decimalSum += decimal

print(F'Sum: {decimalSum}')
print(f'SNAFU: {Base5ToSNAFU(numberToBase(decimalSum, 5))}')
