import { FormEvent } from "react";

export default function Comp({ data }) {
  return (
    <div>
      <h2>Asset</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <style jsx>{``}</style>
    </div>
  );
}
