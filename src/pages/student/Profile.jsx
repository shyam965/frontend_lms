import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Loader2Icon, LoaderPinwheel } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/redux/Action/authAction";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth?.profile || []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfile());
      setIsLoading(false); 
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="text-2xl font-semibold mb-4 text-center">Profile</h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoaderPinwheel className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-8 md:items-start">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 ">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div>
              <h1 className="font-bold text-2xl ">
                Name: <span className="font-semibold ">{data?.user?.name}</span>
              </h1>
              <h1 className="font-bold text-2xl ">
                Email: <span className="font-semibold ">{data?.user?.email}</span>
              </h1>
              <h1 className="font-bold text-2xl ">
                Role: <span className="font-semibold ">{data?.user?.role}</span>
              </h1>
            </div>
            <Dialog className="">
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 ">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      Profile Photo
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                        wait
                      </>
                    ) : (
                      "save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};
