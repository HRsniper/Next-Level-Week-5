defmodule Inmana.Welcomer do
  def welcome(%{"name" => name, "age" => age}) do
    age = String.to_integer(age)

    name
    |> String.trim()
    |> String.downcase()
    |> evaluate(age)
  end

  defp evaluate("neo", 56) do
    {:ok, "You are the chosen one neo"}
  end

  defp evaluate(name, age) when age >= 18 do
    {:ok, "You are not the chosen one #{name}"}
  end

  defp evaluate(name, _age) do
    {:error, "You shall not pass #{name}"}
  end
end
