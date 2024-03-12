"use client";
import SampledetailComponent from "@/components/sampledetail/sampledetail.component";
import { API, Sample } from "@/services/api";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: number;
  };
};

export default function FiltersSampleDetails({ params }: Props) {
  const [sample, setSample] = useState<Sample | null>(null);

  useEffect(() => {
    API.getSample(params.id).then((result) => {
      setSample(result);
    });
  }, [params.id]);

  if (!sample) {
    return (
      <div className="flex flex-col">
        <div className="items-center">Loading...</div>
      </div>
    );
  }

  return <SampledetailComponent {...sample} />;
}
