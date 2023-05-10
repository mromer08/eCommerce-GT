import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreditCardIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { formatterPrice } from "../../utils/priceFormatter";
import { BASE_URL } from "../api/axios";
export default function CreditCardList() {
  const cards = [
    {
      _id: "name",
      expirationDate: Date.now(),
      lastDigits: 1234,
    },
    {
      _id: "name",
      expirationDate: Date.now(),
      lastDigits: 1234,
    },
  ];
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cards.map((card) => (
            <li key={card._id} className="flex py-6">
              <CreditCardIcon className="ml-4 w-10" />
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-bold text-indigo-900">
                    <h3>{`**** ${card.lastDigits}`}</h3>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex space-x-3 text-gray-500">
                    <p>
                      Expira { }{new Date(card.expirationDate).toLocaleDateString(
                        "en-GB", { month: "2-digit", year: "numeric" }
                      )}
                    </p>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => console.log(card)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
