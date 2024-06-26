import React, { useEffect, useRef, useState } from "react";
import {
  useCreateWinnersBetsMutation,
  useGetWinnersBetsQuery,
  useUpdateWinnersBetsMutation,
} from "../../app/Services/winnersApi";
import Loader from "../../../Components/Loader";
import { useGetRoundsQuery } from "../../../app/Services/roundsApi";
import { useForm } from "react-hook-form";
import Datalist from "../../../Components/Datalist";
import { teams } from "../../../Data/teams";
import { Link, redirect } from "react-router-dom";
import { history } from "../../../app/store";
import Text from "../../../Components/Text";

function WinnerForm({ roundData, existingData}) {
  const [
    createWinnersBets,
    {
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
    },
  ] = useCreateWinnersBetsMutation();
  const [
    updateWinnersBets,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdateWinnersBetsMutation();
  const [formData, setFormData] = useState({
    team: existingData ? existingData?.team : "",
    bet : existingData ? existingData?.bet : 0,
    round_id: roundData?.id,
  });
  // const [allPlayers, setAllPlayers] = useState([]);

  const [totalAmount, setTotalAmount] = useState(
    import.meta.env.VITE_REACT_APP_WINNERS_AMOUNT
  );

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    let amount = parseInt(formData["bet"]);
    setTotalAmount(
      parseInt(import.meta.env.VITE_REACT_APP_WINNERS_AMOUNT) - amount
    );
  }, [formData]);
  const handleFormSubmit = async (e) => {
    clearErrors("amount");
    if(totalAmount<0) {
      setError("error", {
        type: "custom",
        message: `Total amount should be less than ${
          import.meta.env.VITE_REACT_APP_WINNERS_AMOUNT
        }`,
      });
      return;
    }
    if(!existingData) {
        try {
            const res = await createWinnersBets(formData).unwrap();
            setError("success", {
              type: "custom",
              message: `${res.message}`,
            });
        } catch (error) {
          setError("error", {
            type: "custom",
            message: `${error?.data?.message}`,
          });
        }
    } else {
        try {
            const res = await updateWinnersBets(formData).unwrap();
            setError("success", {
              type: "custom",
              message: `${res.message}`,
            });
        } catch (error) {
          setError("error", {
            type: "custom",
            message: `${error?.data?.message}`,
          });
        }
    }
  };

  const onChange = (e) => {
    clearErrors("amount");
    clearErrors(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect( () => {
    if(existingData) {
        setFormData({...formData, team: existingData.team})
    }
  },[])

  return (
    <div className="mx-auto  min-h-full flex-col justify-center px-6 pb-12 lg:px-8 max-w-4xl mx-auto mt-16">
      <div className="sm:mx-auto">
        <div className=" text-center text-xl leading-9 tracking-tight text-gray-900">
          {` Total Bet amount:  `}
          <span className="font-bold  text-green-400">{totalAmount}</span>
        </div>
        {errors["error"] && (
            <p className="text-xs text-[#E45555] text-left pt-[8px] mx-auto text-center">
              {errors["error"].message}
            </p>
          )}
          {errors["success"] && (
            <p className="text-xs text-[#36df44] text-left pt-[8px] mx-auto text-center">
              {errors["success"].message}
            </p>
          )}
      </div>
      <div className="mt-5 sm:mx-auto ">
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 text-left"
          >
            Who will win the Tournament?
          </label>
          <div className="flex-col justify-between">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-left"
              >
                <span className="text-xs text-red-500">
                  {roundData?.odds}
                </span>
              </label>
              <Datalist
                selected={formData?.teams}
                placeholder={existingData?.team}
                onChange={(i) => {
                  setFormData({ ...formData, "team": i?.name });
                }}
                items={[
                  { name: "Addmie & Indomie" },
                  { name: "GPL & Corporate " },
                  { name: "Colgate White Warriors" },
                  { name: "ARPN & Power Broncos" },
                ]}
              />
            </div>
            <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left mt-10"
                    >
                      Enter Bet Amount
                    </label>
                    <Text
                      register={register}
                      name="bet"
                      type="number"
                      value={formData?.bet}
                      onChange={onChange}
                      withCheck={true}
                      //   options={{
                      //     required: "Please enter this field",
                      //   }}
                      errors={errors}
                    />
                  </div>
          </div>
          <div className=" sm:mt-6 mt-16 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              // onClick={() => setOpen(false)}
            >
              Submit
            </button>
            <Link
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            //   onClick={() => resetState()}
            //   ref={cancelButtonRef}
                to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WinnerForm;
