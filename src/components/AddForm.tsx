import * as React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface Props {
  label: string;
  form: React.ReactElement;
}

export const DrawerDialog: React.FC<Props> = ({ label, form }) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{label}</Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-4 sm:max-w-[650px] max-h-[80dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un participants</DialogTitle>
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Sheet modal open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>{label}</Button>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="bg-white p-4 max-h-screen overflow-y-auto"
        >
          <SheetHeader className="text-left mb-3">
            <SheetTitle>Ajouter un participants</SheetTitle>
          </SheetHeader>
          {form}
          <SheetFooter className="pt-2">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Annuler
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
};
