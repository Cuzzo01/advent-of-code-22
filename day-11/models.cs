using System.Numerics;

namespace AoCTemplate
{
  class Monkey
  {
    public List<Item> Items;
    public Func<BigInteger, BigInteger> InspectionOperation;
    public int InspectionCount;
    public Func<BigInteger, bool> TestOperation;
    public int TrueMonkey;
    public int FalseMonkey;
    public int? commonMultiple;

    public List<(int Index, Item Item)> ProcessTurn()
    {
      var toReturn = new List<(int, Item)>();
      foreach (var item in Items)
      {
        item.WorryLevel = InspectionOperation(item.WorryLevel);
        if (commonMultiple.HasValue) item.WorryLevel = item.WorryLevel % commonMultiple.Value;
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
    public BigInteger WorryLevel;
  }
}