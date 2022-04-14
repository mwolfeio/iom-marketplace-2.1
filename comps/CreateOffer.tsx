// @ts-nocheck
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useUser from "lib/useUser";
import axios from "axios";
import fetchJson from "lib/fetchJson";

import FormWrapper from "comps/FormWrapper";
import Loader from "comps/Loader";

export default function Comp({
  show,
  data,
  hook,
}: {
  show: boolean;
  data: any;
}) {
  const [open, setOpen] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { user, mutateUser } = useUser();

  if (!show) return <></>;
  return (
    <div>
      {open ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ width: "100%", marginBottom: ".5rem" }}
        >
          Close
        </button>
      ) : (
        <button disabled className="primary disabled" style={{ width: "100%" }}>
          Create Offer (Comming Soon)
        </button>
      )}
      {open && (
        <FormWrapper
          errorMessage={error}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();
            setLoading(true);
            console.log("submitting offer");

            try {
              console.log("event.currentTarget: ", event.currentTarget);

              //submit offer
              let payload = {
                token: data.token,
                amount:
                  data.tokenType === "FUNGIBLE"
                    ? event.currentTarget.quant.value
                    : 1,
                unitPrice: event.currentTarget.price.value,
                nftId: data.id,
                description: event.currentTarget.description.value,
              };
              console.log("payload: ", payload);
              await axios.post(
                "https://api.apiiom.com/store/createOffer",
                payload,
                {
                  headers: { Authorization: user.token },
                }
              );
              console.log("offer created");

              //refresh getChars
              hook();

              //toast
              toast.success(`Offer Created!`);

              //close modal
              router.push("/wallet");
            } catch (error) {
              if (error.response) {
                if (error.response.status === 401) {
                  mutateUser(
                    await fetchJson("/api/logout", { method: "POST" }),
                    false
                  );
                  router.push("/login");
                }
                console.error("Error:", error.response.data);
                setErrorMsg(error.response.data.message);
              } else console.error("An unexpected error happened:", error);
            }
            setLoading(false);
          }}
        >
          {data.tokenType === "FUNGIBLE" && (
            <label>
              <input
                type="number"
                name="quant"
                placeholder="Quantity..."
                required
              />
            </label>
          )}
          <label>
            <input
              type="number"
              name="price"
              placeholder="Price in IOM..."
              required
            />
          </label>

          <label>
            <textarea
              type="text"
              name="description"
              placeholder="Description..."
              required
            />
          </label>
          <button type="submit" className="primary" style={{ width: "100%" }}>
            {laoding ? <Loader /> : "Submit Offer"}
          </button>
        </FormWrapper>
      )}
    </div>
  );
}
