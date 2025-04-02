using System.ComponentModel.DataAnnotations;

public class DensityRecord
{
    [Key]
    public int Id { get; set; }
    public string Month { get; set; }
    public int Value { get; set; }
}
