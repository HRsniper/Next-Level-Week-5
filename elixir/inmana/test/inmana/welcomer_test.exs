defmodule Inmana.WelcomerTest do
  use ExUnit.Case, async: true

  alias Inmana.Welcomer

  describe "welcome/1" do
    test "if the user is chosen, return a message" do
      params = %{"name" => "neo", "age" => "56"}
      result = Welcomer.welcome(params)

      expect_result = {:ok, "You are the chosen one neo"}

      assert result == expect_result
    end

    test "if the user is not chosen, return a message" do
      params = %{"name" => "not_neo", "age" => "56"}
      result = Welcomer.welcome(params)

      expect_result = {:ok, "You are not the chosen one not_neo"}

      assert result == expect_result
    end

    test "if the user has less than 18 years, return a message" do
      params = %{"name" => "new_neo", "age" => "17"}
      result = Welcomer.welcome(params)

      expect_result = {:error, "You shall not pass new_neo"}

      assert result == expect_result
    end
  end
end
