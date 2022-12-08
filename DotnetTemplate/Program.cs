namespace AoCTemplate
{
  class Program
  {
    static void Main(string[] args)
    {
      string input;
      try
      {
        input = System.IO.File.ReadAllText("./input.txt");
      }
      catch (Exception)
      {
        Console.WriteLine("Failed to read input.txt, quitting");
        return;
      }

      var solver = new Solver(input);
      Console.WriteLine($"Answer to part 1 is: {solver.Part1()}");
      Console.WriteLine($"Answer to part 2 is: {solver.Part2()}");
    }
  }
}