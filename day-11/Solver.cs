using System.Numerics;

namespace AoCTemplate
{
  class Solver
  {
    private Dictionary<int, Monkey> Monkeys = new Dictionary<int, Monkey>();
    public Solver(string input)
    {
      ParseInput(input);
    }

    public string Part1()
    {
      for (var round = 1; round <= 20; round++)
      {
        for (var i = 0; i < Monkeys.Count; i++)
        {
          var resultItems = Monkeys[i].ProcessTurn();
          foreach (var result in resultItems)
          {
            Monkeys[result.Index].Items.Add(result.Item);
          }
        }
        PrintMonkeys(round);
      }

      PrintInspectionCounts();

      var inspectionCountList = Monkeys.Select((x) => (x.Value.InspectionCount)).ToList();
      inspectionCountList.Sort((a, b) => b - a);
      return (inspectionCountList[0] * inspectionCountList[1]).ToString();
    }

    public string Part2(string input)
    {
      return "Not Implemented";
    }

    private void PrintMonkeys(int round)
    {
      Console.WriteLine($"Round {round}:");
      foreach (var (index, monkey) in Monkeys.Select(x => (x.Key, x.Value)))
      {
        var items = string.Join(", ", monkey.Items.Select(i => i.WorryLevel).ToList());
        Console.WriteLine($"\tMonkey {index}: {items}");
      }
      Console.WriteLine();
    }

    private void PrintInspectionCounts()
    {
      foreach (var (index, monkey) in Monkeys.Select(x => (x.Key, x.Value)))
      {
        Console.WriteLine($"Monkey {index} inspected items {monkey.InspectionCount} times.");
      }
    }

    private void ParseInput(string input, bool divideByThree = false)
    {
      Monkeys = new Dictionary<int, Monkey>();
      var lines = input.Split("\n").ToList();
      var monkeyStarts = Enumerable.Range(0, lines.Count).Where(i => lines[i].Contains("Monkey")).ToList();
      foreach (var firstIndex in monkeyStarts)
      {
        var monkeyNumber = int.Parse(lines[firstIndex].Replace(":", String.Empty).Split(" ")[1]);

        var itemsLine = lines[firstIndex + 1].Replace(",", String.Empty).Trim().Split(" ").ToList();
        var startingItems = new List<Item>();
        for (var i = 2; i < itemsLine.Count; i++)
        {
          var startingLevel = int.Parse(itemsLine[i]);
          startingItems.Add(new Item
          {
            WorryLevel = startingLevel
          });

        }

        var operationLine = lines[firstIndex + 2].Trim().Split(" ");
        var operationChar = operationLine[4];
        var operationValue = operationLine[5];
        var selfOperation = false;
        if (operationValue == "old") selfOperation = true;
        Func<int, int> operationFunc;
        Func<int, int> operationBase = (input) => (input / 3);
        switch (operationChar)
        {
          case "*":
            if (selfOperation) operationFunc = (input) => operationBase(input * input);
            else operationFunc = (input) => operationBase(input * int.Parse(operationValue));
            break;
          case "+":
          default:
            if (selfOperation) operationFunc = (input) => operationBase(input + input);
            else operationFunc = (input) => operationBase(input + int.Parse(operationValue));
            break;
        }

        var testLine = lines[firstIndex + 3].Trim().Split(" ");
        var testValue = int.Parse(testLine[3]);
        Func<int, bool> testFunc = (input) => input % testValue == 0;

        var trueMonkeyIndex = int.Parse(lines[firstIndex + 4].Trim().Split(" ")[5]);
        var falseMonkeyIndex = int.Parse(lines[firstIndex + 5].Trim().Split(" ")[5]);

        Monkeys.Add(monkeyNumber, new Monkey
        {
          Items = startingItems,
          InspectionOperation = operationFunc,
          TestOperation = testFunc,
          FalseMonkey = falseMonkeyIndex,
          TrueMonkey = trueMonkeyIndex
        });
      }
    }
  }
}