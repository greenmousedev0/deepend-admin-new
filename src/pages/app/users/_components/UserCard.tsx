import type { User } from "@/api/types";
import {
  Mail,
  Phone,
  MapPin,
  User as UserIcon,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-col space-y-2">
        <div className="flex gap-2 items-center">
          <UserIcon className="" size={64} />
          <div className="flex flex-col  text-xl font-bold">
            {user.firstName} <span>{user.lastName}</span>
            <div
              className={`badge size-auto badge-xs mt-2 p-2 w-fit badge-soft rounded-full  gap-2 ${
                user.emailVerified ? "badge-success" : "badge-error"
              }`}
            >
              {user.emailVerified ? (
                <>
                  <CheckCircle size={16} /> Verifiied
                </>
              ) : (
                <>
                  <XCircle size={16} />
                  Not verifiied
                </>
              )}
            </div>
          </div>
        </div>
        <div className="  space-y-4 ">
          <p className="flex  items-center text-wrap break-words">
            <Mail className="inline-block mr-2" size={18} /> {user.email}
          </p>
          <p className="flex items-center text-wrap break-words">
            <Phone className="inline-block mr-2" size={18} /> {user.phone}
          </p>
          <p className="flex items-center text-wrap break-words">
            <MapPin className="inline-block mr-2" size={18} /> {user.address}
          </p>

          <p className="flex items-center text-wrap break-words">
            <Calendar className="inline-block mr-2" size={18} /> Created At:{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className=" items-center text-wrap break-words ">
            <UserIcon className="inline-block mr-2" size={18} />
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
