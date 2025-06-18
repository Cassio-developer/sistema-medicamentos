import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import UserProfile from "./components/UserProfile";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Cadastro de Remédios - v2",
  description: "Sistema para gerenciamento de medicamentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <header className="bg-indigo-600 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Sistema de Medicamentos</h1>
                <UserProfile />
              </div>
            </header>
            <main className="flex-grow bg-gray-50">
              {children}
            </main>
            <Footer />
            <ChatBot />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
