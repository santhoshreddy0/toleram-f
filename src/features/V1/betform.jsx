import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Text from "../../Components/Text";
import {
  useCreateBetsMutation,
  useUpdateBetsMutation,
} from "../app/Services/betsApi";
import { teams } from "../../Data/teams";
import Datalist from "../../Components/Datalist";

export default function BetForm({ matchData, allBets, resetState }) {
  const [
    createBets,
    {
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
    },
  ] = useCreateBetsMutation();
  const [
    updateBets,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdateBetsMutation();
  const [formData, setFormData] = useState({
    wins: "",
    wins_bet: 0,
    toss: "",
    toss_bet: 0,
    sixes: "",
    sixes_bet: 0,
    female_player: "",
    female_player_bet: 0,
    most_runs: "",
    most_runs_bet: 0,
    most_wickets: "",
    most_wickets_bet: 0,
    team_one_fs: "",
    team_one_fs_bet: 0,
    team_two_fs: "",
    team_two_fs_bet: 0,
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
    if (matchData.isEdit) {
      
      
      try {
        const res = await updateBets({
          match_id: matchData.match_id,
          ...formData,
        }).unwrap();
        resetState();
      } catch (error) {
        console.log(error);
        setError("amount", {
          type: "custom",
          message: `${error?.data?.message}`,
        });
      }
    } else {
      try {
        const res = await createBets({
          match_id: matchData.match_id,
          ...formData,
        }).unwrap();
        resetState();
      } catch (error) {
        console.log(error);
        setError("amount", {
          type: "custom",
          message: `${error?.data?.message}`,
        });
      }
    }
  };

  useEffect(() => {
    if (allBets && allBets?.userBets && allBets?.userBets?.length > 0) {
      allBets.userBets.map((b) => {
        if (b["match_id"] == matchData["match_id"]) {
          const data = {
            wins: b["wins"],
            wins_bet: b["wins_bet"],
            toss: b["toss"],
            toss_bet: b["toss_bet"],
            sixes: b["sixes"],
            sixes_bet: b["sixes_bet"],
            female_player: b["female_player"],
            female_player_bet: b["female_player_bet"],
            most_runs: b["most_runs"],
            most_runs_bet: b["most_runs_bet"],
            most_wickets: b["most_wickets"],
            most_wickets_bet: b["most_wickets_bet"],
            team_one_fs: b["team_one_fs"],
            team_one_fs_bet: b["team_one_fs_bet"],
            team_two_fs: b["team_two_fs"],
            team_two_fs_bet: b["team_two_fs_bet"],
          };
          setFormData(data);
        }
      });
    }
  }, []);

  const cancelButtonRef = useRef(null);

  const onChange = (e) => {
    clearErrors("amount");
    clearErrors(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let amount =
      parseInt(formData["wins_bet"]) +
      parseInt(formData["toss_bet"]) +
      parseInt(formData["sixes_bet"]) +
      parseInt(formData["female_player_bet"]) +
      parseInt(formData["most_runs_bet"]) +
      parseInt(formData["most_wickets_bet"]) +
      Math.max(parseInt(formData["team_one_fs_bet"]),parseInt(formData["team_two_fs_bet"]));
    setTotalAmount(
      parseInt(import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT) - amount
    );
  }, [formData]);

  const allPlayers = (() => {
    const team_one_players = [];
    const team_two_players = [];
    teams[matchData.team_one].players.map((p) => {
      if (p.gender == "male") {
        return team_one_players.push(p);
      }
    });
    teams[matchData.team_two].players.map((p) => {
      if (p.gender == "male") {
        return team_two_players.push(p);
      }
    });
    return team_one_players.concat(team_two_players);
  })();

  const f_players = (() => {
    const team_one_players = [];
    const team_two_players = [];
    teams[matchData.team_one].players.map((p) => {
      if (p.gender == "female") {
        return team_one_players.push(p);
      }
    });
    teams[matchData.team_two].players.map((p) => {
      if (p.gender == "female") {
        return team_two_players.push(p);
      }
    });
    return team_one_players.concat(team_two_players);
  })();

  return (
    <>
      <div className="mx-auto  min-h-full flex-col justify-center px-6 pb-12 lg:px-8 max-w-6xl mx-auto">
        <div className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {matchData?.title}
        </div>
        <div className="font-medium mx-auto text-center text-indigo-600">
          {teams[matchData.team_one]?.name}
        </div>
        <div className="mx-auto text-center">Vs</div>
        <div className="font-medium mx-auto text-indigo-600">
          {teams[matchData.team_two]?.name}
        </div>
        <div className="sm:mx-auto">
          <div className=" text-center text-xl leading-9 tracking-tight text-gray-900">
            {` Remaining amount:  `}
            <span className="font-bold  text-green-400">₦{totalAmount}</span>
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                >
                  Who will win the toss?
                  <br />
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium leading-6 text-red-500 text-left"
                    >
                      {/* Who will win the toss?<br/> */}
                      <span>{matchData.questions["toss"]}</span>
                    </label>
                    <Datalist
                      selected={formData?.toss}
                      placeholder={formData?.toss}
                      onChange={(i) => {
                        setFormData({ ...formData, toss: i.name });
                      }}
                      items={[
                        { name: teams[matchData.team_one].name },
                        { name: teams[matchData.team_two].name },
                      ]}
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Enter Bet Amount
                    </label>
                    <Text
                      register={register}
                      name="toss_bet"
                      type="number"
                      value={formData?.toss_bet}
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                >
                  Who will win the match?
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      <span className="text-xs text-red-500">
                        {matchData.questions["win"]}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.wins}
                      placeholder={formData?.wins}
                      onChange={(i) => {
                        setFormData({ ...formData, wins: i.name });
                      }}
                      items={[
                        { name: teams[matchData.team_one].name },
                        { name: teams[matchData.team_two].name },
                      ]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Enter Bet Amount
                    </label>
                    <Text
                      register={register}
                      name="wins_bet"
                      type="number"
                      value={formData?.wins_bet}
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                >
                  How many 6s will be hit in the match?
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      <span className="text-xs text-red-500">
                        {matchData.questions["sixes"]}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.sixes}
                      placeholder={formData?.sixes}
                      onChange={(i) => {
                        setFormData({ ...formData, sixes: i.name });
                      }}
                      items={[
                        { name: 'Option A' },
                        { name: 'Option B' },
                      ]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Enter Bet Amount
                    </label>
                    <Text
                      register={register}
                      name="sixes_bet"
                      type="number"
                      value={formData?.sixes_bet}
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                >
                  Which female player will score the most runs in this match?
                  <span className="text-xs text-red-500">
                        <br/>{matchData.questions["female_player"]}
                      </span>
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      {/* <span className="text-xs text-red-500">
                        {matchData.questions["female_player"]}
                      </span> */}
                      Select
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
                      Enter Bet Amount
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                >
                  Who will score the most runs?
                  <span className="text-xs text-red-500">
                        <br/>{matchData.questions["most_runs"]}
                      </span>
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Select
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
                      Enter Bet Amount
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                >
                  Who will take the most wickets?
                  <span className="text-xs text-red-500">
                        <br/>{matchData.questions["most_wickets"]}
                      </span>
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Select
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
                      Enter Bet Amount
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left line-clamp-1 mt-10"
                >
                  {`Will ${teams[matchData.team_one]?.name} score ${
                    matchData?.questions["team_one_fs"]
                  } or more runs in the first innings?`}
                  <br />
                  {`(Note: The bet becomes void if ${
                    teams[matchData.team_one]?.name
                  } don’t bat first)`}
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className=" block text-sm font-medium leading-6 text-gray-900 text-left line-clamp-1"
                    >
                      <span className="text-xs text-red-500">
                      {`${matchData.questions['team_one_fs_odds']}`}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.team_one_fs}
                      placeholder={formData?.team_one_fs}
                      onChange={(i) => {
                        setFormData({ ...formData, team_one_fs: i.name });
                      }}
                      items={[{ name: "Yes" }, { name: "No" }]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Enter Bet Amount
                    </label>
                    <Text
                      register={register}
                      name="team_one_fs_bet"
                      type="number"
                      value={formData?.team_one_fs_bet}
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
                  className="block text-sm font-medium leading-6 text-gray-900 text-left line-clamp-1 mt-10"
                >
                  {`Will ${teams[matchData.team_two]?.name} score ${
                    matchData?.questions["team_two_fs"]
                  } or more runs in the first innings?`}
                  <br />
                  {`(Note: The bet becomes void if ${
                    teams[matchData.team_two]?.name
                  } don’t bat first)`}
                </label>
                <div className="sm:flex justify-between">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left line-clamp-1"
                    >
                      <span className="text-xs text-red-500">
                        {`${matchData.questions['team_two_fs_odds']}`}
                      </span>
                    </label>
                    <Datalist
                      selected={formData?.team_two_fs}
                      placeholder={formData?.team_two_fs}
                      onChange={(i) => {
                        setFormData({ ...formData, team_two_fs: i.name });
                      }}
                      items={[{ name: "Yes" }, { name: "No" }]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Enter Bet Amount
                    </label>
                    <Text
                      register={register}
                      name="team_two_fs_bet"
                      type="number"
                      value={formData?.team_two_fs_bet}
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
