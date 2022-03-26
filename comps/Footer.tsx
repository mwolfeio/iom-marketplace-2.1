export default function Footer() {
  return (
    <footer>
      <div>footer</div>
      <style jsx global>{`
        .loader {
          border: 5px solid #ffffff60;
          border-top: 5px solid #ffffff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </footer>
  );
}
