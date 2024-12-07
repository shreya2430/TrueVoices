import { useTranslation } from "react-i18next";
import Header from "./LandingPage/Header";
import Footer from "./LandingPage/Footer";

const ProfileCard = () => {
  const { t } = useTranslation(); // Hook for translations
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-136px)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <div className="w-full max-w-2xl bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-lg rounded-lg p-8 border border-[hsl(var(--border))]">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center text-6xl font-bold">
              {user.firstName?.[0]?.toUpperCase() || t("profile.defaultAvatar")}
            </div>
          </div>

          {/* User Details */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-lg mt-2">{user.email}</p>
          </div>

          {/* Credits Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4 border-[hsl(var(--border))]">
              <span className="text-lg font-medium">
                {t("profile.textCredits")}
              </span>
              <span className="text-2xl font-bold">{user.textCredits}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-4 border-[hsl(var(--border))]">
              <span className="text-lg font-medium">
                {t("profile.videoCredits")}
              </span>
              <span className="text-2xl font-bold">{user.videoCredits}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileCard;