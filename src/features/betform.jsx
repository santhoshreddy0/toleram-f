import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Text from "../Components/Text";

export default function BetForm(props) {
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

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleFormSubmit = (e) => {
        const res = login(formData);
        console.log(res);
    };

    const onChange = (e) => {
        clearErrors(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="mx-auto lg:w-1/2 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {props?.title}
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto ">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(handleFormSubmit)}
                    >
                        <div>
                            <div className="">
                                <div className="flex justify-between border">
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
                                            options={{
                                                required:
                                                    "Please enter this field",
                                            }}
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
                                            name="who_wins_bet"
                                            type="text"
                                            value={
                                                formData?.who_wins_who_wins_bet
                                            }
                                            onChange={onChange}
                                            withCheck={true}
                                            options={{
                                                required:
                                                    "Please enter this field",
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between border">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900 text-left"
                                        >
                                            Who win win
                                        </label>
                                        <Text
                                            register={register}
                                            name="who_wins_toss"
                                            type="text"
                                            value={formData?.who_wins_toss}
                                            onChange={onChange}
                                            withCheck={true}
                                            options={{
                                                required:
                                                    "Please enter this field",
                                            }}
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
                                            value={
                                                formData?.who_wins_toss_bet
                                            }
                                            onChange={onChange}
                                            withCheck={true}
                                            options={{
                                                required:
                                                    "Please enter this field",
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                </div>

                                <Text
                                    register={register}
                                    name="who_wins_toss"
                                    type="password"
                                    value={formData?.who_wins_toss}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="who_wins_toss_bet"
                                    type="password"
                                    value={formData?.who_wins_toss_bet}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="most_runs_male"
                                    type="text"
                                    value={formData?.most_runs_male}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="most_runs_male_bet"
                                    type="number"
                                    value={formData?.most_runs_male_bet}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="best_female_player"
                                    type="password"
                                    value={formData?.best_female_player}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="best_female_player_bet"
                                    type="password"
                                    value={formData?.best_female_player_bet}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="first_inn_score"
                                    type="password"
                                    value={formData?.first_inn_score}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="first_inn_score_bet"
                                    type="password"
                                    value={formData?.first_inn_score_bet}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="max_sixes"
                                    type="password"
                                    value={formData?.max_sixes}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                                <Text
                                    register={register}
                                    name="max_sixes_bet"
                                    type="password"
                                    value={formData?.max_sixes_bet}
                                    onChange={onChange}
                                    withCheck={true}
                                    options={{
                                        required: "Please enter this field",
                                    }}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                bet now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
