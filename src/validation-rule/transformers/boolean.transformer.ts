import { Transform, TransformFnParams } from "class-transformer";

export default function BooleanTransformer() {
  return Transform((v: TransformFnParams) => ["1", 1, "true", true].includes(v.value))
}