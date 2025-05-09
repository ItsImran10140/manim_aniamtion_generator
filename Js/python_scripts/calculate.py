import sys
import random
import json  # For proper JSON formatting

def calculate(a, b):
    return {
        'sum': a + b,
        'product': a * b,
        'random_numbers': [random.random() for _ in range(5)]
    }

if __name__ == '__main__':
    a = float(sys.argv[1])
    b = float(sys.argv[2])
    
    result = calculate(a, b)
    print(json.dumps(result))  # Ensures proper JSON formatting