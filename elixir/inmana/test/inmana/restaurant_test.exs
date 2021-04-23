defmodule Inmana.RestaurantTest do
  use Inmana.DataCase, async: true
  alias Inmana.Restaurant

  describe "changeset/1" do
    test "when all params are valid, returns a valid changeset" do
      params = %{name: "Restaurant", email: "restaurant@email.com"}
      response = Restaurant.changeset(params)

      expect_result = %Ecto.Changeset{
        changes: %{email: "restaurant@email.com", name: "Restaurant"},
        valid?: true
      }

      assert expect_result = response
    end

    test "when there params are invalid, returns a invalid changeset" do
      # params = %{name: "", email: ""}
      params = %{name: "R", email: ""}
      # params = %{name: "Re", email: ""}
      # params = %{name: "Re", email: "email.com"}

      response = Restaurant.changeset(params)

      assert %Ecto.Changeset{valid?: false} = response

      expect_result = %{email: ["can't be blank"], name: ["should be at least 2 character(s)"]}
      # expect_result = %{email: ["can't be blank"]}

      assert errors_on(response) == expect_result
    end
  end
end
