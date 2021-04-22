defmodule Inmana.Supplies.ExpirationEmail do
  import Bamboo.Email
  alias Inmana.Supply

  def create(to_email, supplies) do
    new_email(
      to: to_email,
      from: "support@inmana.com",
      subject: "Supplies that are about to expire",
      html_body: email_html(supplies),
      text_body: email_text(supplies)
    )
  end

  defp email_text(supplies) do
    initial_text = "----- Supplies that are about to expire -----\n"

    Enum.reduce(supplies, initial_text, fn supply, text -> text <> supply_text(supply) end)
  end

  defp supply_text(%Supply{
         description: description,
         expiration_date: expiration_date,
         responsible: responsible
       }) do
    "Description: #{description}\nExpiration Date: #{expiration_date}\nResponsible: #{responsible}\n\n"
  end

  defp email_html(supplies) do
    initial_html = "<h1>Supplies that are about to expire</h1> <br>"

    Enum.reduce(supplies, initial_html, fn supply, text -> text <> supply_html(supply) end)
  end

  defp supply_html(%Supply{
         description: description,
         expiration_date: expiration_date,
         responsible: responsible
       }) do
    "<p><span>Description: #{description}</span> <br> <strong>Expiration Date: #{expiration_date}</strong> <br> <span>Responsible: #{
      responsible
    }</span></p>"
  end
end
