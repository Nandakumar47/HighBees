import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToDestination = useCallback(
    (destinationSlug: string) => {
      navigate(`/destinations/${destinationSlug}`);
    },
    [navigate]
  );

  const navigateToDestinations = useCallback(() => {
    navigate("/destinations");
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const navigateToContact = useCallback(() => {
    navigate("/contact");
  }, [navigate]);
  const navigateToEnquiry = useCallback(
    (destinationSlug?: string) => {
      const enquiryPath = destinationSlug
        ? `/enquiry?destination=${destinationSlug}`
        : "/enquiry";
      navigate(enquiryPath);
    },
    [navigate]
  );

  const isDestinationRoute = useCallback(
    (pathname?: string) => {
      const currentPath = pathname || location.pathname;
      return currentPath.startsWith("/destinations/");
    },
    [location.pathname]
  );

  const isDestinationsRoute = useCallback(
    (pathname?: string) => {
      const currentPath = pathname || location.pathname;
      return (
        currentPath === "/destinations" ||
        currentPath.startsWith("/destinations/")
      );
    },
    [location.pathname]
  );

  const getCurrentDestinationSlug = useCallback(() => {
    if (isDestinationRoute()) {
      return location.pathname.split("/destinations/")[1];
    }
    return null;
  }, [location.pathname, isDestinationRoute]);

  return {
    navigateToDestination,
    navigateToDestinations,
    navigateToHome,
    navigateToEnquiry,
    isDestinationRoute,
    isDestinationsRoute,
    getCurrentDestinationSlug,
    currentPath: location.pathname,
    navigateToContact,
  };
};
