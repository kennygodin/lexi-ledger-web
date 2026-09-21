import { useRef, useState } from "react";
import { useUploadStatement } from "../hooks/use-upload-statement";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { getErrorMessage } from "@/lib/errors";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Upload01Icon,
  CheckmarkCircle02Icon,
  MultiplicationSignCircleIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "@/components/ui/toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPE = "application/pdf";

function formatFileSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadStatementDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UploadStatementDialog({
  open,
  onClose,
}: UploadStatementDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadStatement();

  const state = validationError
    ? "error"
    : upload.isError
      ? "error"
      : upload.isPending
        ? "uploading"
        : upload.isSuccess
          ? "success"
          : "idle";

  const reset = () => {
    setFile(null);
    setValidationError(null);
    setProgress(0);
    upload.reset();
  };

  const handleClose = () => {
    if (upload.isPending) return;
    reset();
    onClose();
  };

  const validateFile = (candidate: File): string | null => {
    if (candidate.type !== ACCEPTED_TYPE) {
      return "Only PDF files are supported.";
    }
    if (candidate.size > MAX_FILE_SIZE) {
      return "Your file surpasses the size limit of 10MB.";
    }
    return null;
  };

  const handleFile = (candidate: File) => {
    const error = validateFile(candidate);
    if (error) {
      setFile(candidate);
      setValidationError(error);
      return;
    }

    setFile(candidate);
    setValidationError(null);
    setProgress(0);

    upload.mutate(
      { file: candidate, onUploadProgress: setProgress },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Statement uploaded — processing has started.",
          });
        },
      },
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const candidate = event.target.files?.[0];
    if (candidate) handleFile(candidate);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const candidate = event.dataTransfer.files?.[0];
    if (candidate) handleFile(candidate);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => !o && handleClose()}
      disablePointerDismissal
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload statement</DialogTitle>
          <DialogDescription>
            PDF only, up to 10MB. We'll parse your transactions automatically.
          </DialogDescription>
        </DialogHeader>

        {state === "idle" && (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <div className="flex size-10 items-center justify-center bg-muted">
              <HugeiconsIcon
                icon={Upload01Icon}
                className="size-5 text-muted-foreground"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Choose a file</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Drag and drop, or click to browse
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>
        )}

        {state === "uploading" && file && (
          <div className="flex flex-col items-center gap-3 border p-8 text-center">
            <div className="flex size-10 items-center justify-center bg-muted">
              <Spinner className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Uploading</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {file.name}
              </p>
            </div>
            <Progress value={progress} className="w-full">
              <ProgressLabel className="text-muted-foreground">
                {formatFileSize((file.size * progress) / 100)}
              </ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center gap-3 border p-8 text-center">
            <div className="flex size-10 items-center justify-center bg-primary/10">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="size-5 text-primary"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Success!</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Your statement was uploaded and is now being processed.
              </p>
            </div>
            <Button size="sm" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-3 border p-8 text-center">
            <div className="flex size-10 items-center justify-center bg-destructive/10">
              <HugeiconsIcon
                icon={MultiplicationSignCircleIcon}
                className="size-5 text-destructive"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Uh oh.</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {validationError ?? getErrorMessage(upload.error)}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={reset}>
              Choose Another Document
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
