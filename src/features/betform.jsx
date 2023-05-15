import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Text from "../Components/Text";
import {
  useCreateBetsMutation,
  useUpdateBetsMutation,
} from "../app/Services/betsApi";

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
    who_wins: "",
    who_wins_bet: 0,
    who_wins_toss: "",
    who_wins_toss_bet: 0,
    most_runs_male: "",
    most_runs_male_bet: 0,
    best_female_player: "",
    best_female_player_bet: 0,
    first_inn_score: "",
    first_inn_score_bet: 0,
    max_sixes: "",
    max_sixes_bet: 0,
  });

  const [totalAmount , setTotalAmount] = useState(import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT)

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  //   console.log(matchData);
  const handleFormSubmit = async (e) => {
    if (matchData.isEdit) {
        try {
            const res = await updateBets({
              match_id: matchData.match_id,
              ...formData,
            }).unwrap();
            resetState();
          } catch (error) {

          }
    } else {
      try {
        const res = await createBets({
          match_id: matchData.match_id,
          ...formData,
        }).unwrap();
        resetState();
      } catch (error) {

      }
    }
  };

  useEffect(() => {
    if (allBets && allBets?.userBets && allBets?.userBets?.length > 0) {
      allBets.userBets.map((b) => {
        if (b["match_id"] == matchData["match_id"]) {
          const data = {
            who_wins: b["who_wins"],
            who_wins_bet: b["who_wins_bet"],
            who_wins_toss: b["who_wins_toss"],
            who_wins_toss_bet: b["who_wins_toss_bet"],
            most_runs_male: b["most_runs_male"],
            most_runs_male_bet: b["most_runs_male_bet"],
            best_female_player: b["best_female_player"],
            best_female_player_bet: b["best_female_player_bet"],
            first_inn_score: b["first_inn_score"],
            first_inn_score_bet: b["first_inn_score_bet"],
            max_sixes: b["max_sixes"],
            max_sixes_bet: b["max_sixes_bet"],
          };
          setFormData(data);
        }
      });
    }
  }, []);

  const cancelButtonRef = useRef(null);

  const onChange = (e) => {
    clearErrors(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
   let amount = formData['who_wins_bet']+formData['who_wins_toss_bet']+formData['most_runs_male_bet']+formData['best_female_player_bet']+formData['first_inn_score_bet']+formData["max_sixes_bet"];
   setTotalAmount(parseInt(import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT)-amount)
  }, [formData])
  

  return (
    <>
      <div className="mx-auto  min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto">
          <h4 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
            {` Remaining amount:  `}<span className="font-bold  text-green-400">{totalAmount}</span>
          </h4>
        </div>
        <div className="mt-10 sm:mx-auto ">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <div className="">
                <div className="sm:flex justify-around">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Who win win
                    </label>
                    <Text
                      register={register}
                      name="who_wins"
                      type="text"
                      value={formData?.who_wins}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Bet
                    </label>
                    <Text
                      register={register}
                      name="who_wins_bet"
                      type="number"
                      value={formData?.who_wins_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="sm:flex justify-around">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Who win toss
                    </label>
                    <Text
                      register={register}
                      name="who_wins_toss"
                      type="text"
                      value={formData?.who_wins_toss}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
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
                      name="who_wins_toss_bet"
                      type="text"
                      value={formData?.who_wins_toss_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="sm:flex justify-around">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      most runs male
                    </label>
                    <Text
                      register={register}
                      name="most_runs_male"
                      type="text"
                      value={formData?.most_runs_male}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
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
                      name="most_runs_male_bet"
                      type="number"
                      value={formData?.most_runs_male_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="sm:flex justify-around">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      best female player
                    </label>
                    <Text
                      register={register}
                      name="best_female_player"
                      type="text"
                      value={formData?.best_female_player}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
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
                      name="best_female_player_bet"
                      type="number"
                      value={formData?.best_female_player_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="sm:flex justify-around">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      first inn score
                    </label>
                    <Text
                      register={register}
                      name="first_inn_score"
                      type="text"
                      value={formData?.first_inn_score}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
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
                      name="first_inn_score_bet"
                      type="number"
                      value={formData?.first_inn_score_bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="sm:flex justify-around">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      max sixes
                    </label>
                    <Text
                      register={register}
                      name="max_sixes"
                      type="text"
                      value={formData?.max_sixes}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
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
                      name="max_sixes_bet"
                      type="number"
                      value={formData?.max_sixes_bet}
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
