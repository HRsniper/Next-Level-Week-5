defmodule InmanaWeb.RestaurantsViewTest do
  use InmanaWeb.ConnCase, async: true
  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  describe "render/2" do
    test "renders create.json" do
      params = %{name: "Restaurant", email: "restaurant@email.com"}
      {:ok, restaurant} = Inmana.create_restaurant(params)

      response = render(InmanaWeb.RestaurantsView, "create.json", restaurant: restaurant)

      expect_result = %{
        message: "Restaurant created",
        restaurant: %Inmana.Restaurant{
          email: "restaurant@email.com",
          # id: _id,
          # inserted_at: _inserted_at,
          # updated_at: _updated_at,
          name: "Restaurant",
          supplies: %Inmana.Supply{}
        }
      }

      assert expect_result = response
    end
  end
end
