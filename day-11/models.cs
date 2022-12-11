using System.Numerics;

namespace AoCTemplate
{
  class Monkey
  {
    public List<Item> Items;
    public Func<int, int> InspectionOperation;
    public int InspectionCount;
    public Func<int, bool> TestOperation;
    public int TrueMonkey;
    public int FalseMonkey;

    public List<(int Index, Item Item)> ProcessTurn()
    {
      var toReturn = new List<(int, Item)>();
      foreach (var item in Items)
      {
        item.WorryLevel = InspectionOperation(item.WorryLevel);
        InspectionCount++;
        var isTrue = TestOperation(item.WorryLevel);
        if (isTrue) toReturn.Add((TrueMonkey, item));
        else toReturn.Add((FalseMonkey, item));
      }
      Items.Clear();

      return toReturn;
    }
  }

  class Item
  {
    public int WorryLevel;
  }
}