defmodule InmanaWeb.RestaurantsControllerTest do
  use InmanaWeb.ConnCase, async: true

  describe "create/2" do
    test "when all params are valid, returns a valid restaurant", %{conn: conn} do
      params = %{name: "Restaurant", email: "restaurant@email.com"}

      response =
        conn
        |> post(Routes.restaurants_path(conn, :create, params))
        |> json_response(:created)

      expect_result = %{
        "message" => "Restaurant created",
        "restaurant" => %{
          "email" => "restaurant@email.com",
          # "id" => _id,
          "name" => "Restaurant"
        }
      }

      assert expect_result = response
    end

    test "when there params are invalid, returns a invalid restaurant", %{conn: conn} do
      params = %{name: "", email: "restaurant@email.com"}

      response =
        conn
        |> post(Routes.restaurants_path(conn, :create, params))
        |> json_response(:bad_request)

      expect_result = %{"message" => %{"name" => ["can't be blank"]}}

      assert response == expect_result
    end
  end
end
