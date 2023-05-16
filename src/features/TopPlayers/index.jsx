import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Text from "../../Components/Text";
import { useCreatePlayersBetsMutation, useGetPlayersBetsQuery, useUpdatePlayersBetsMutation } from "../../app/Services/playersApi";
import { teams } from "../../Data/teams";
import Datalist from "../../Components/Datalist";

export default function BetForm({ matchData, allBets, resetState }) {
  const [
    createPlayersBets,
    {
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
    },
  ] = useCreatePlayersBetsMutation();
  const [
    updatePlayersBets,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdatePlayersBetsMutation();

  const {data: playersData, isLoading:isPlayersLoading, isError:isPlayersErrror} = useGetPlayersBetsQuery();

  const [formData, setFormData] = useState({
    sixes: "",
    sixes_bet: 0,
    female_player: "",
    female_player_bet: 0,
    most_runs: "",
    most_runs_bet: 0,
    most_wickets: "",
    most_wickets_bet: 0,
  });
  // const [allPlayers, setAllPlayers] = useState([]);

  const [totalAmount, setTotalAmount] = useState(
    import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT
  );

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (e) => {
    clearErrors("amount");
    if (totalAmount < 0) {
      setError("amount", {
        type: "custom",
        message: `Total amount should be less than ${
          import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT
        }`,
      });
      return;
    }
    if (playersData && playersData?.bets && playersData?.bets?.length > 0) {
      // console.log(formData);
      // return
      try {
        const res = await updatePlayersBets({
          ...formData,
        }).unwrap();
        resetState();
      } catch (error) {}
    } else {
      try {
        const res = await createPlayersBets({
          ...formData,
        }).unwrap();
        resetState();
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (playersData && playersData?.bets && playersData?.bets?.length > 0) {
      playersData?.bets.map((b) => {
          const data = {
            sixes: b["sixes"],
            sixes_bet: b["sixes_bet"],
            female_player: b["female_player"],
            female_player_bet: b["female_player_bet"],
            most_runs: b["most_runs"],
            most_runs_bet: b["most_runs_bet"],
            most_wickets: b["most_wickets"],
            most_wickets_bet: b["most_wickets_bet"],
          };
          setFormData(data);
      });
    }
  }, [playersData]);

  const cancelButtonRef = useRef(null);

  const onChange = (e) => {
    clearErrors("amount");
    clearErrors(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let amount =
      parseInt(formData["sixes_bet"]) +
      parseInt(formData["female_player_bet"]) +
      parseInt(formData["most_runs_bet"]) +
      parseInt(formData["most_wickets_bet"]);
    setTotalAmount(
      parseInt(import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT) - amount
    );
  }, [formData]);

  const allPlayers = (() => {
    let players = [];
    teams.map((t) => {
      players = players.concat(t.players);
    });
    
    return players;
  })();

  const f_players = (() => {
    const all_f_players = [];
    teams.map((t) => {
      t?.players?.map(p => {
      if (p.gender == "female") {
        return all_f_players.push(p);
      }
    }
    )});
    
    return all_f_players;
  })();

  return (
    <>
      <div className="mx-auto  min-h-full flex-col justify-center px-6 pb-12 lg:px-8 max-w-4xl mx-auto">
        
        <div className="sm:mx-auto">
          <div className=" text-center text-xl leading-9 tracking-tight text-gray-900">
            {` Remaining amount:  `}
            <span className="font-bold  text-green-400">{totalAmount}</span>
          </div>
          {errors["amount"] && (
            <p className="text-xs text-[#E45555] text-left pt-[8px] mx-auto text-center">
              {errors["amount"].message}
            </p>
          )}
        </div>
        <div className="mt-5 sm:mx-auto ">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <div className="">
                
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                  Who will be the best female player?
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      <span className="text-xs text-red-500">
                        {/* {matchData.questions["sixes"]} */}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.female_player}
                      placeholder={formData?.female_player}
                      onChange={(i) => {
                        setFormData({ ...formData, female_player: i.name });
                      }}
                      items={f_players}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Bet
                    </label>
                    <Text
                      register={register}
                      name="female_player_bet"
                      type="number"
                      value={formData?.female_player_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                  Who will score the most runs?
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      <span className="text-xs text-red-500">
                        {/* {matchData.questions["female_player"]} */}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.most_runs}
                      placeholder={formData?.most_runs}
                      onChange={(i) => {
                        setFormData({ ...formData, most_runs: i.name });
                      }}
                      items={allPlayers}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Bet
                    </label>
                    <Text
                      register={register}
                      name="most_runs_bet"
                      type="number"
                      value={formData?.most_runs_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                  Who will take the most wickets?
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      <span className="text-xs text-red-500">
                        {/* {matchData.questions["most_runs"]} */}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.most_wickets}
                      placeholder={formData?.most_wickets}
                      onChange={(i) => {
                        setFormData({ ...formData, most_wickets: i.name });
                      }}
                      items={allPlayers}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Bet
                    </label>
                    <Text
                      register={register}
                      name="most_wickets_bet"
                      type="number"
                      value={formData?.most_wickets_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                  Who will take the most wickets?
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      <span className="text-xs text-red-500">
                        {/* {matchData.questions["most_wickets"]} */}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.most_wickets}
                      placeholder={formData?.most_wickets}
                      onChange={(i) => {
                        setFormData({ ...formData, most_wickets: i.name });
                      }}
                      items={allPlayers}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Bet
                    </label>
                    <Text
                      register={register}
                      name="most_wickets_bet"
                      type="number"
                      value={formData?.most_wickets_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div>
              <button
                type="submit"
                className="flex w-full lg:w-4/5  mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                bet now
              </button>
            </div> */}
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                // onClick={() => setOpen(false)}
              >
                Submit
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                onClick={() => resetState()}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
