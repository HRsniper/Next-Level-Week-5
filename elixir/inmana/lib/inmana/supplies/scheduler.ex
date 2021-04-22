defmodule Inmana.Supplies.Scheduler do
  use GenServer
  alias Inmana.Supplies.ExpirationNotification

  # SERVER
  @impl true
  def init(state \\ %{}) do
    schedule_notification()

    {:ok, state}
  end

  @impl true
  def handle_info(:generate, state) do
    ExpirationNotification.send()
    schedule_notification()

    {:noreply, state}
  end

  defp schedule_notification() do
    #                          1000 * 60 * 60 * 24 * 7 = 1 semana
    #                                     1000 * 10 = 10 segundos
    Process.send_after(self(), :generate, 1000 * 10)
  end

  # CLIENT
  def start_link(_state) do
    GenServer.start_link(__MODULE__, %{})
  end
end
