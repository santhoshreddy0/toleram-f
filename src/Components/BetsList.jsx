import React from "react";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BetsList = ({ data, questions, editLink }) => {
  return (
    <div className="flex flex-col justify-between p-4 m-2">
      <div className="flex flex-row justify-between">
        <BackButton />
        {data?.can_bet == "1" && (
          <div className="text-right">
            <Link
              to={editLink}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-4">{data?.match_title}</div>
      <div className="text-xl font-bold mb-4">
        Total rewards :{" "}
        {data?.can_show_points == "1" ? data?.points : "Not Processed..."}
      </div>
      {questions?.questions?.map((question) => {
        const bet = data?.answers[question.id];
        const correct = question?.correct_option == bet?.option;
        const profit = correct
          ? bet?.amount *
            question.options.find((opt) => opt.id === bet?.option)?.odds
          : 0;
        const choseOption = question.options.find(
          (option) => option.id == bet?.option
        );
        if (choseOption) {
          return (
            <ListItem
              key={question.id}
              question={question.question}
              amount={bet.amount}
              status={
                question.correct_option ? (correct ? "Won" : "Lost") : "Pending"
              }
              choseOption={choseOption}
              correctOption={question.options.find(
                (option) => option.id == question.correct_option
              )}
            />
          );
        } else {
          return <></>;
        }
      })}
    </div>
  );
};
const statuses = {
  Won: "text-green-700 bg-green-200 ring-green-600/20",
  Pending: "text-gray-600 bg-gray-200 ring-gray-500/10",
  Void: "text-gray-600 bg-gray-200 ring-gray-500/10",
  Lost: "text-red-700 bg-red-200 ring-red-600/10",
};

const ListItem = ({
  question,
  amount,
  status,
  key,
  choseOption,
  correctOption,
}) => {
  return (
    <li
      key={key}
      className="overflow-hidden rounded-xl border border-gray-200 mt-3 bg-gray-600"
    >
      <div
        className={classNames(
          "flex flex-col  gap-x-4 border-b  p-3 justify-between"
        )}
      >
        <div className={"text-lg font-medium leading-6 text-left"}>
          {question}
        </div>

        {choseOption && (
          <div className="flex justify-between text-sm">
            <div className={" font-medium leading-6 text-right"}>
              {" "}
              Odd : {choseOption?.odds}{" "}
            </div>
            <div className={" font-medium leading-6 text-right"}>
              Bet Amount: {amount}
            </div>
          </div>
        )}
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        {choseOption ? (
          <>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="">Bet placed on :</dt>
              <dd className="">
                {choseOption?.option ? choseOption?.option : "Not Placed"}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="">Right Bet :</dt>
              <dd className="">
                {correctOption?.option ? correctOption?.option : "- - -"}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="">Best status</dt>
              <dd className="flex items-start gap-x-2">
                {/* <div className="font-medium ">{amount}</div> */}
                <div
                  className={classNames(
                    correctOption?.option == "void" ? statuses["Void"] :
                    statuses[status],
                    "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {correctOption?.option == "void" ? "Void" : status}
                </div>
              </dd>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-x-4 py-3">
              No Bet Placed
            </div>
          </>
        )}
      </dl>
    </li>
  );
};

export default BetsList;
