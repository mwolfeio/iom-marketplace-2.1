import { useEffect, useState, FormEvent } from "react";

export default function Comp({ show, data }: { show: boolean; data: any }) {
  const [open, setOpen] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //submit offer
    let payload = {
      token: "IOM",
      amount: 0,
      unitPrice: 0,
      nftId: "string",
      description: "string",
    };
    //go to wallet
  };

  if (!show) return <></>;
  return (
    <div>
      {open ? (
        <button type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      ) : (
        <button className="primary" onClick={() => setOpen(true)}>
          Create Offer
        </button>
      )}
      {open && (
        <form onSubmit={() => handleSubmit()}>
          {data.tokenType === "FUNGIBLE" && (
            <label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity..."
                required
              />
            </label>
          )}
          <label>
            <input
              type="number"
              name="Price"
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
          <button type="submit" className="primary">
            Submit Offer
          </button>
        </form>
      )}
    </div>
  );
}
